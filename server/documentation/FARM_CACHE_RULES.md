The `/rules` property controls which documents are cached according to the document path. Regardless of the /rules property, Dispatcher never caches a document in the following circumstances:
- Request URI contains a question mark (?).
	* Indicates a dynamic page, such as a search result that does not need to be cached.
- The file extension is missing.
	* The web server needs the extension to determine the document type (the `MIME-type`).
- The authentication header is set (configurable).
- If the AEM instance responds with the following headers:
	* no-cache
	* no-store
	* must-revalidate

**NOTE**: The `GET` or `HEAD` (for the HTTP header) methods are cacheable by the Dispatcher. For additional information on response header caching, see [Caching HTTP Response Headers](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#caching-http-response-headers).

Each item in the `/rules` property includes a glob pattern and a type:
- The `glob` pattern is used to match the path of the document.
- The `type` indicates whether to cache the documents that match the `glob` pattern. The value can be `allow` (to cache the document) or `deny` (to always render the document).

If you do not have dynamic pages (beyond those pages already excluded by the above rules), you can configure Dispatcher to cache everything. The rules section looks as follows:

```
/rules {
	/0000 { /glob "*" /type "allow" }
}
```

For information about glob properties, see [Designing Patterns for glob Properties](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#designing-patterns-for-glob-properties).

If there are some sections of your page that are dynamic (for example a news application) or within a closed user group, you can define exceptions:

**NOTE**: Do not cache closed user groups as user rights are not checked for cached pages.

```
/rules {
	/0000 { /glob "*" /type "allow" }
	/0001 { /glob "/en/news/*" /type "deny" }
	/0002 { /glob "*/private/*" /type "deny"  }
}
```

---

**Source:**

https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#specifying-the-documents-to-cache
