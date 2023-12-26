The glob pattern which represents a page.

```
/filter {
	/0000 {
		/glob "*"
		/type "deny"
	}
	/0001 {
		/glob "/content/secure/*.html"
		/type "allow"
	}
}
```

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/permissions-cache.html?lang=en#configure-dispatcher-for-permission-sensitive-caching)
