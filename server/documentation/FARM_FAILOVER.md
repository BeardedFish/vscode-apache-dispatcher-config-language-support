To resend requests to different renders when the original request fails, enable the failover mechanism on your Dispatcher farm. When failover is enabled, Dispatcher has the following behavior:
- When a request to a render returns HTTP status 503 (UNAVAILABLE), Dispatcher sends the request to a different render.
- When a request to a render returns HTTP status 50x (other than 503), Dispatcher sends a request for the page that is configured for the health_check property.
	* If the health check returns 500 (INTERNAL_SERVER_ERROR), Dispatcher sends the original request to a different render.
	* If the health check returns HTTP status 200, Dispatcher returns the initial HTTP 500 error to the client.

To enable failover, add the following line to the farm (or website):

```
/failover "1"
```

**NOTE**: To retry HTTP requests that contain a body, Dispatcher sends a `Expect: 100-continue` request header to the render before spooling the actual contents. CQ 5.5 with CQSE then immediately answers with either 100 (CONTINUE) or an error code. Other servlet containers are supported as well.

---

**Source:**

https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#using-the-failover-mechanism
