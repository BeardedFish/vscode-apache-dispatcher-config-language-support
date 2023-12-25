When sticky connections are enabled, the Dispatcher module sets the `renderid` cookie. This cookie does not have the `httponly` flag, which should be added to enhance security. You add the `httponly` flag by setting the `httpOnly` property in the `/stickyConnections` node of a `dispatcher.any` configuration file. The property's value (either `0` or `1`) defines whether the `renderid` cookie has the `HttpOnly` attribute appended. The default value is `0`, which means the attribute is not added.

For additional information about the `httponly` flag, read [this page](https://www.owasp.org/index.php/HttpOnly).

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#identifying-a-sticky-connection-folder-stickyconnectionsfor)
