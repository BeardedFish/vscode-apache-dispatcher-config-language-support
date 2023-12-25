When sticky connections are enabled, the Dispatcher module sets the `renderid` cookie. This cookie does not have the secure flag, which should be added to enhance security. You add the `secure` flag setting the secure property in the `/stickyConnections` node of a `dispatcher.any` configuration file. The property's value (either `0` or `1`) defines whether the `renderid` cookie has the secure attribute appended. The default value is `0`, which means the attribute is added if the incoming request is secure. If the value is set to `1`, then the secure flag is added regardless of whether the incoming request is secure or not.

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#identifying-a-sticky-connection-folder-stickyconnectionsfor)
