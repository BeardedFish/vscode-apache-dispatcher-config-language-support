The glob pattern which represents a query parameter name.

For example, if you want to ignore the `p1` parameter from the following URL `http://example.com/path/test.html?p1=test&p2=v2`, then the glob property should be:

```
/0001 { /glob "p1" /type "allow" }
```

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#ignoring-url-parameters)
