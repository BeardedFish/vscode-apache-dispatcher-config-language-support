When adding the header `X-Dispatcher-Info` to a request, Dispatcher answers whether the target was cached, returned from cached, or not cacheable at all. The response header `X-Cache-Info` contains this information in a readable form. You can use these response headers to debug issues involving responses cached by the Dispatcher.

This functionality is not enabled by default, so for the response header `X-Cache-Info` to be included, the farm must contain the following entry:

```
/info "1"
```

For example:

```
/farm {
    /mywebsite {
        # Include X-Cache-Info response header if X-Dispatcher-Info is in request header
        /info "1"
    }
}
```

Also, the `X-Dispatcher-Info` header does not need a value, but if you use [curl](https://curl.se) for testing, you must supply a value to send to the header, such as:

`curl -v -H "X-Dispatcher-Info: true" https://localhost/content/wknd/us/en.html`

Below is a table containing the response headers that X-Dispatcher-Info returns:

| Response Header                                      | Description                                                                                                                         |
|------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `cached`                                             | The target file is contained in the cache and the Dispatcher has determined that it is valid to deliver it.                                                                                                                                                                                                                                              |
| `caching`                                            | The target file isn't contained in the cache and the Dispatcher has determined that it is valid to cache the output and deliver it.                                                                                                                                                                                                                      |
| `caching: stat file is more recent`                  | The target file is contained in the cache; however, it is invalidated by a more recent stat file. The Dispatcher deletes the target file, recreate it from the output and deliver it.                                                                                                                                                                    |
| `not cacheable: no document root`                    | The farm's configuration doesn't contain a document root (configuration element `cache.docroot`).                                                                                                                                                                                                                                                        |
| `not cacheable: cache file path too long`            | The target file - the concatenation of document root and URL file - exceeds the longest possible file name on the system.           |                                                                                                                                                                                                                    |
| `not cacheable: temporary file path too long`        | The temporary file name template exceeds the longest possible file name on the system. The Dispatcher creates a temporary file first, before actually creating or overwriting the cached file. The temporary file name is the target file name with the characters `_YYYYXXXXXX` appended to it, where the Y and X are replaced to create a unique name. |
| `not cacheable: request URL has no extension`        | The request URL has no extension, or there is a path following the file extension, for example: `/test.html/a/path`.                                                                                                                                                                                                                                     |
| `not cacheable: request wasn't a GET or HEAD`        | The HTTP method is not a `GET` or a `HEAD`. The Dispatcher assumes that the output contains dynamic data that should not be cached.                                                                                                                                                                                                                      |
| `not cacheable: request contained a query string`    | The request contained a query string. The Dispatcher assumes that the output depends on the query string given and therefore does not cache.                                                                                                                                                                                                             |
| `not cacheable: session manager didn't authenticate` | The farm's cache is governed by a session manager (the configuration contains a `sessionmanagement` node) and the request didn't contain the appropriate authentication information.                                                                                                                                                                     |
| `not cacheable: request contains authorization`      | The farm is not allowed to cache output (`allowAuthorized 0`) and the request contains authentication information.                                                                                                                                                                                                                                       |
| `not cacheable: target is a directory`               | The target file is a directory. This location might point to some conceptual mistake, where a URL and some sub-URL both contain cacheable output. For example, if a request to `/test.html/a/file.ext` comes first and contains cacheable output, the Dispatcher is not able to cache the output of a subsequent request to `/test.html`.                |
| `not cacheable: request URL has a trailing slash`    | The request URL has a trailing slash.                                                                                                                                                                                                                                                                                                                    |
| `not cacheable: request URL not in cache rules`      | The farm's cache rules explicitly deny caching the output of some request URL.                                                                                                                                                                                                                                                                           |
| `not cacheable: authorization checker denied access` | The farm's authorization checker denied access to the cached file.                                                                                                                                                                                                                                                                                       |
| `not cacheable: session not valid`                   | The farm's cache is governed by a session manager (configuration contains a `sessionmanagement` node) and the user's session is not or no longer valid.                                                                                                                                                                                                  |
| `not cacheable: response contains no_cache`          | The remote server returned a `Dispatcher: no_cache` header, forbidding the Dispatcher to cache the output.                                                                                                                                                                                                                                               |
| `not cacheable: response content length is zero`     | The content length of the response is zero; the Dispatcher does not create a zero-length file.                                                                                                                                                                                                                                                           |

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#debugging)
