The `/extension` property is used to filter the request based on the extension method. The `/filter` property can include one or more extensions via POSIX Extended Regular Expressions:

```
/0001 {
	# ...
	/extension '(js|json|css|png|jpeg|gif|html)'
}
```

For more information, see [Sling URL Decomposition](https://sling.apache.org/documentation/the-sling-engine/url-decomposition.html) and [Sling Cheatsheet](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/content/implementing/developing/full-stack/sling-cheatsheet.html).

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#configuring-access-to-content-filter)
