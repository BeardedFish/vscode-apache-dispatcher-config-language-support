The `/stickyConnectionsFor` property defines one folder that contains sticky documents. This property is accessed using the URL. Dispatcher sends all requests, from a single user that are in this folder, to the same render instance. Sticky connections ensure that session data is present and consistent for all documents. This mechanism uses the `renderid` cookie.

The following example defines a sticky connection to the `/products` folder:

```
/stickyConnectionsFor "/products"
```

---

**Source:**

https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#identifying-a-sticky-connection-folder-stickyconnectionsfor
