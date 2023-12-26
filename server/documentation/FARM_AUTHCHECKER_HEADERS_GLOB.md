The glob pattern which represents a HTTP header.

```
/headers {
	/0000 {
		/glob "*"
		/type "deny"
	}
	/0001 {
		/glob "Set-Cookie:*"
		/type "allow"
	}
}
```

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/permissions-cache.html?lang=en#configure-dispatcher-for-permission-sensitive-caching)
