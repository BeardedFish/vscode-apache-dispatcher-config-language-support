The `/statfile` property identifies the file to use as the statfile. Dispatcher uses this file to register the time of the most recent content update. The statfile can be any file on the web server.

The statfile has no content. When content is updated, Dispatcher updates the timestamp. The default statfile is named `.stat` and is stored in the docroot. Dispatcher blocks access to the statfile.

If `/statfileslevel` is configured, Dispatcher ignores the `/statfile` property and uses `.stat` as the name.

---

**Source:**

https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#naming-the-statfile
