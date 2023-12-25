The `/statistics` section defines categories of files for which Dispatcher scores the responsiveness of each render. Dispatcher uses the scores to determine which render to send a request.

Each category that you create defines a glob pattern. Dispatcher compares the URI of the requested content to these patterns to determine the category of the requested content:
- The order of the categories determines the order in which they are compared to the URI.
- The first category pattern that matches the URI is the category of the file. No more category patterns are evaluated.

Dispatcher supports a maximum of eight statistics categories. If you define more than eight categories, only the first 8 are used.

## Render Selection

Each time Dispatcher requires a rendered page, it uses the following algorithm to select the render:

1. If the request contains the render name in a `renderid` cookie, Dispatcher uses that render.
2. If the request includes no `renderid` cookie, Dispatcher compares the render statistics:
	- Dispatcher determines the category of the request URI.
	- Dispatcher determines which render has the lowest response score for that category, and selects that render.
3. If no render is selected yet, use the first render in the list.

The score for a render's category is based on previous response times, and previous failed and successful connections that Dispatcher attempts. For each attempt, the score for the category of the requested URI is updated.

If you do not use load balancing, you can omit this section.

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#configuring-load-balancing-statistics)
