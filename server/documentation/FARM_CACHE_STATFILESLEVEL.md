Use the `/statfileslevel` property to invalidate cached files according to their path:
- Dispatcher creates `.statfiles` in each folder from the docroot folder to the level that you specify. The docroot folder is level `0`.
- Files are invalidated by touching the `.stat` file. The `.stat` file's last modification date is compared to the last modification date of a cached document. The document is re-fetched if the `.stat` file is newer.
- When a file at a certain level is invalidated, all `.stat` files from the docroot to the level of the invalidated file or the configured statsfilevel (whichever is smaller) are touched.
	* For example: if you set the `statfileslevel` property to `6` and a file is invalidated at level `5` then every `.stat` file from docroot to `5` are touched. Continuing with this example, if a file is invalidated at level `7` then every stat file from docroot to six are touched (since `/statfileslevel` equals `6`).

Only resources **along the path** to the invalidated file are affected. Consider the following example: a website uses the structure `/content/myWebsite/xx/`. If you set statfileslevel as `3`, a `.statfile` is created as follows:
- `docroot`
- `/content`
- `/content/myWebsite`
- `/content/myWebsite/*xx*`

When a file in `/content/myWebsite/xx` is invalidated, then every `.stat` file from docroot down to `/content/myWebsite/xx` is touched. This scenario is the case only for `/content/myWebsite/xx` and not for example `/content/myWebsite/yy` or `/content/anotherWebSite`.

**NOTE**: Invalidation can be prevented by sending an extra Header `CQ-Action-Scope:ResourceOnly`. This method can be used to flush particular resources without invalidating other parts of the cache. See [this page](https://adobe-consulting-services.github.io/acs-aem-commons/features/dispatcher-flush-rules/index.html) and [Manually Invalidating the Dispatcher Cache](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/page-invalidate.html?lang=en#configuring) for additional details.

**NOTE**: If you specify a value for the `/statfileslevel` property, the `/statfile` property is ignored.

---

**Source:**

https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#invalidating-files-by-folder-level
