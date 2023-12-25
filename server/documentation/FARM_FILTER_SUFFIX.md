The `/query` property is used to filter the request based on its suffix.

```
/0001 {
	/type "deny"
	/suffix '(.*infinity.*|.*children.*|.*tidy.*)'
}
```

For more information, see the [Sling URL Decomposition](https://sling.apache.org/documentation/the-sling-engine/url-decomposition.html) wiki page.

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#configuring-access-to-content-filter)
