"""Local development server that never lets the browser cache anything.

`python -m http.server` sends no cache headers at all, so browsers fall back to
heuristic caching and happily serve yesterday's JavaScript — which looks exactly
like a change that did not work. This sends no-store on everything instead.

In production the service worker handles freshness (network-first for code,
cache-first for the plan images), so this is only for working on the app.

Run:  python tools/serve.py [port]
"""
import http.server
import socketserver
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8777


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


class Server(socketserver.ThreadingTCPServer):
    """Threaded: index.html asks for ten files at once, and a serial server
    stalls them in a five-deep accept queue until the browser gives up and
    reports ERR_CONNECTION_REFUSED on whichever scripts lost the race."""
    allow_reuse_address = True     # so a restart does not trip over TIME_WAIT
    daemon_threads = True          # Ctrl-C exits without waiting on open sockets


if __name__ == "__main__":
    with Server(("0.0.0.0", PORT), NoCacheHandler) as httpd:
        print("serving http://127.0.0.1:%d  (and on this machine's LAN address)" % PORT)
        print("no-store on every response — reloads always fetch fresh code")
        httpd.serve_forever()
