The `/glob` property is designed to match patterns found in the entire request line of an HTTP request.

Filtering with globs is deprecated in Dispatcher. As such, you should avoid using globs in the `/filter` sections since it may lead to security issues.

So, instead of:

```
/glob "* *.css *"
```

Use:

```
/url "*.css"
```

---

**Source:**

https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#defining-a-filter
