The `/docroot` property identifies the directory where cached files are stored.

The value must be the exact same path as the document root of the web server so that Dispatcher and the web server handle the same files.

The web server is responsible for delivering the correct status code when the Dispatcher cache file is used, that's why it is important that it can find it as well.

If you use multiple farms, each farm must use a different document root.

---

**Source:**

https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#specifying-the-cache-directory
