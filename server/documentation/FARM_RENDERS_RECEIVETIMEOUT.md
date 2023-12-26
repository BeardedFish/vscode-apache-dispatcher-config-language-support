Specifies the time in milliseconds that a response is allowed to take. The default is `600000`, causing Dispatcher to wait for 10 Minutes. A setting of `0` eliminates the timeout.

If the timeout is reached while parsing response headers, an HTTP Status of 504 (Bad Gateway) is returned. If the timeout is reached while the response body is read, the Dispatcher returns the incomplete response to the client. It also deletes any cache file that might have been written.

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#renders-options)
