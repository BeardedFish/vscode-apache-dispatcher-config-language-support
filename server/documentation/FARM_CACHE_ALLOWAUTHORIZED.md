The `/allowAuthorized` property controls whether requests that contain any of the following authentication information are cached:
- The `authorization` header
- A cookie named `authorization`
- A cookie named `login-token`

By default, requests that include this authentication information are not cached because authentication is not performed when a cached document is returned to the client. This configuration prevents Dispatcher from serving cached documents to users who do not have the necessary rights.

However, if your requirements permit the caching of authenticated documents, set the `/allowAuthorized` value to one:

```
/allowAuthorized "1"
```

To enable session management (using the `/sessionmanagement` property), the `/allowAuthorized` property must be set to `0`.

---

**Source:**

https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#caching-when-authentication-is-used
