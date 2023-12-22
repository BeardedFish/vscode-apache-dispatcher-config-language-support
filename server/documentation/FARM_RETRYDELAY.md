The `/retryDelay` property sets the time (in seconds) that Dispatcher waits between rounds of connection attempts with the farm renders. For each round, the maximum number of times Dispatcher attempts a connection to a render is the number of renders in the farm.

Dispatcher uses a value of `1` if `/retryDelay` is not explicitly defined. The default value is appropriate usually.

---

**Source:**

https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#specifying-the-page-retry-delay
