The `/unavailablePenalty` property sets the time (in tenths of a second) that is applied to the render statistics when a connection to the render fails. Dispatcher adds the time to the statistics category that matches the requested URI.

For example, the penalty is applied when the TCP/IP connection to the designated hostname/port cannot be established, either because AEM is not running (and not listening) or because of a network-related problem.

The `/unavailablePenalty` property is a direct child of the `/farm` section (a sibling of the `/statistics` section).

If no `/unavailablePenalty` property exists, a value of `1` is used.

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#reflecting-server-unavailability-in-dispatcher-statistics)
