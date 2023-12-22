The `/statistics` section defines categories of files for which Dispatcher scores the responsiveness of each render. Dispatcher uses the scores to determine which render to send a request.

Each category that you create defines a glob pattern. Dispatcher compares the URI of the requested content to these patterns to determine the category of the requested content:
- The order of the categories determines the order in which they are compared to the URI.
- The first category pattern that matches the URI is the category of the file. No more category patterns are evaluated.

Dispatcher supports a maximum of eight statistics categories. If you define more than eight categories, only the first 8 are used.

---

**Source:**

https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#configuring-load-balancing-statistics
