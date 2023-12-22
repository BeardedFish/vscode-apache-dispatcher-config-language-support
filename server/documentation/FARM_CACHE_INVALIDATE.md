The `/invalidate` property defines the documents that are automatically invalidated when content is updated.

With automatic invalidation, Dispatcher does not delete cached files after a content update, but checks their validity when they are next requested. Documents in the cache that are not auto-invalidated remain in the cache until a content update explicitly deletes them.

Automatic invalidation is typically used for HTML pages. HTML pages often contain links to other pages, making it difficult to determine whether a content update affects a page. To make sure that all relevant pages are invalidated when content is updated, automatically invalidate all HTML pages. The following configuration invalidates all HTML pages:

```
/invalidate {
	/0000 { /glob "*" /type "deny" }
	/0001 { /glob "*.html" /type "allow" }
}
```

For information about glob properties, see [Designing Patterns for glob Properties](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#designing-patterns-for-glob-properties).

This configuration causes the following activity when `/content/wknd/us/en` is activated:

- All the files with pattern `en.*` are removed from the `/content/wknd/us` folder.
- The `/content/wknd/us/en./_jcr_content` folder is removed.
- All the other files that match the `/invalidate` configuration are not immediately deleted. These files are deleted when the next request occurs. In the example `/content/wknd.html` is not deleted; it is deleted when `/content/wknd.html` is requested.

If you offer automatically generated PDF and ZIP files for download, you might have to automatically invalidate these files, too. A configuration example looks as follows:

```
/invalidate {
	/0000 { /glob "*" /type "deny" }
	/0001 { /glob "*.html" /type "allow" }
	/0002 { /glob "*.zip" /type "allow" }
	/0003 { /glob "*.pdf" /type "allow" }
}
```

The AEM integration with Adobe Analytics delivers configuration data in an `analytics.sitecatalyst.js` file in your website. The example `dispatcher.any` file that is provided with Dispatcher includes the following invalidation rule for this file:

```
{ /glob "*/analytics.sitecatalyst.js" /type "allow" }
```

---

**Source:**

https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#automatically-invalidating-cached-files
