The `/clientheaders` property defines a list of HTTP headers that Dispatcher passes from the client HTTP request to the renderer.

By default Dispatcher forwards the standard HTTP headers to the renderer instance. In some instances, you might want forward additional headers, or remove specific headers:
- Add headers, such as custom headers, that your AEM instance expects in the HTTP request.
Remove headers, such as authentication headers that are only relevant to the web server.
- If you customize the set of headers to pass through, you must specify an exhaustive list of headers, including those headers that are normally included by default.

For example, a Dispatcher instance that handles page activation requests for publish instances requires the `PATH` header in the `/clientheaders` section. The `PATH` header enables communication between the replication agent and the Dispatcher.

The following code is an example configuration for `/clientheaders`:

```
/clientheaders {
	"CSRF-Token"
	"X-Forwarded-Proto"
	"referer"
	"user-agent"
	"authorization"
	"from"
	"content-type"
	"content-length"
	"accept-charset"
	"accept-encoding"
	"accept-language"
	"accept"
	"host"
	"max-forwards"
	"proxy-authorization"
	"proxy-connection"
	"range"
	"cookie"
	"cq-action"
	"cq-handle"
	"handle"
	"action"
	"cqstats"
	"depth"
	"translate"
	"expires"
	"date"
	"dav"
	"ms-author-via"
	"if"
	"lock-token"
	"x-expected-entity-length"
	"destination"
	"PATH"
}
```

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#specifying-the-http-headers-to-pass-through-clientheaders)
