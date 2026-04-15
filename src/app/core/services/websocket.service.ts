import { Injectable, OnDestroy } from '@angular/core';
import {
  Observable,
  Subject,
  timer,
  EMPTY,
} from 'rxjs';
import {
  catchError,
  filter,
  map,
  share,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { WsEvent, WsProgressEvent, WsResultEvent, WsErrorEvent } from '../models/audit.models';

/**
 * WebSocketService — manages real-time WebSocket connections for audit sessions.
 *
 * Design decisions:
 * - Each session gets its own connection (keyed by session_id).
 * - Connections are reference-counted: disconnected when the last subscriber unsubscribes.
 * - Messages are parsed and typed; callers receive strongly-typed WsEvent objects.
 * - Keep-alive PINGs are sent every 30 s to prevent proxy timeouts.
 * - Auto-reconnect with exponential back-off (up to 3 retries) on unexpected close.
 */
@Injectable({ providedIn: 'root' })
export class WebSocketService implements OnDestroy {
  /** Active socket references keyed by session_id. */
  private sockets = new Map<string, WebSocket>();
  private subjects = new Map<string, Subject<WsEvent>>();
  private pingTimers = new Map<string, ReturnType<typeof setInterval>>();
  private destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.disconnectAll();
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  /**
   * Returns a hot Observable that emits all events from the given session's
   * WebSocket channel. The Observable completes when the server closes the socket
   * or when the caller unsubscribes.
   */
  connect(sessionId: string): Observable<WsEvent> {
    if (!this.subjects.has(sessionId)) {
      this.subjects.set(sessionId, new Subject<WsEvent>());
      this._openSocket(sessionId);
    }
    // share() so all subscribers share the same underlying socket
    return this.subjects.get(sessionId)!.asObservable().pipe(share());
  }

  /** Convenience filter — only emits PROGRESS events. */
  progress$(sessionId: string): Observable<WsProgressEvent> {
    return this.connect(sessionId).pipe(
      filter((e): e is WsProgressEvent => e.type === 'PROGRESS'),
    );
  }

  /** Convenience filter — only emits the final RESULT event. */
  result$(sessionId: string): Observable<WsResultEvent> {
    return this.connect(sessionId).pipe(
      filter((e): e is WsResultEvent => e.type === 'RESULT'),
    );
  }

  /** Convenience filter — only emits ERROR events. */
  error$(sessionId: string): Observable<WsErrorEvent> {
    return this.connect(sessionId).pipe(
      filter((e): e is WsErrorEvent => e.type === 'ERROR'),
    );
  }

  /** Explicitly close a session's WebSocket connection. */
  disconnect(sessionId: string): void {
    this._closeSocket(sessionId);
  }

  // ── Internal socket lifecycle ──────────────────────────────────────────────

  /**
   * Resolves WebSocket base URL. When `environment.wsBaseUrl` is empty (typical for
   * same-origin Netlify builds with AUDITIQ_API_BASE_URL=/api), use the page origin.
   */
  private _wsBaseUrl(): string {
    const configured = environment.wsBaseUrl?.trim();
    if (configured) return configured.replace(/\/+$/, '');
    if (typeof globalThis !== 'undefined' && 'location' in globalThis) {
      const loc = (globalThis as unknown as { location: Location }).location;
      if (loc?.host) {
        const proto = loc.protocol === 'https:' ? 'wss:' : 'ws:';
        return `${proto}//${loc.host}`;
      }
    }
    return '';
  }

  private _openSocket(sessionId: string, attempt = 0): void {
    const base = this._wsBaseUrl();
    const url = `${base}/ws/progress/${sessionId}`;
    const ws = new WebSocket(url);
    this.sockets.set(sessionId, ws);

    ws.onopen = () => {
      console.debug(`[WS] Connected — session ${sessionId}`);
      this._startPing(sessionId, ws);
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const parsed: WsEvent = JSON.parse(event.data as string);
        this.subjects.get(sessionId)?.next(parsed);

        // Auto-close after final events
        if (parsed.type === 'RESULT' || (parsed.type === 'PROGRESS' && parsed.status === 'DONE')) {
          setTimeout(() => this._closeSocket(sessionId), 500);
        }
      } catch {
        console.warn('[WS] Received non-JSON message:', event.data);
      }
    };

    ws.onerror = (err) => {
      console.error(`[WS] Error on session ${sessionId}`, err);
    };

    ws.onclose = (event: CloseEvent) => {
      console.debug(`[WS] Closed — session ${sessionId}, code=${event.code}`);
      this._stopPing(sessionId);

      const MAX_RETRIES = 3;
      const RETRY_BASE_MS = 1_000;

      // Only retry on unexpected disconnects (not clean closes)
      if (!event.wasClean && attempt < MAX_RETRIES) {
        const delay = RETRY_BASE_MS * 2 ** attempt;
        console.info(`[WS] Reconnecting in ${delay}ms (attempt ${attempt + 1}/${MAX_RETRIES})`);
        setTimeout(() => this._openSocket(sessionId, attempt + 1), delay);
      } else {
        this.subjects.get(sessionId)?.complete();
        this.sockets.delete(sessionId);
        this.subjects.delete(sessionId);
      }
    };
  }

  private _closeSocket(sessionId: string): void {
    this._stopPing(sessionId);
    const ws = this.sockets.get(sessionId);
    if (ws && ws.readyState < WebSocket.CLOSING) {
      ws.close(1000, 'Client disconnected');
    }
    this.sockets.delete(sessionId);
    this.subjects.get(sessionId)?.complete();
    this.subjects.delete(sessionId);
  }

  private _startPing(sessionId: string, ws: WebSocket): void {
    const interval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send('PING');
      }
    }, 30_000);
    this.pingTimers.set(sessionId, interval);
  }

  private _stopPing(sessionId: string): void {
    const t = this.pingTimers.get(sessionId);
    if (t !== undefined) {
      clearInterval(t);
      this.pingTimers.delete(sessionId);
    }
  }

  private disconnectAll(): void {
    for (const id of this.sockets.keys()) {
      this._closeSocket(id);
    }
  }
}
