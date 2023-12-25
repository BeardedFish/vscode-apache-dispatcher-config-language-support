The `/allowedClients` property defines specific clients that are allowed to flush the cache. The globbing patterns are matched against the IP.

The following example:

- Denies access to any client.
- Explicitly allows access to the localhost.

```
/allowedClients {
	/0001 { /glob "*.*.*.*" /type "deny" }
	/0002 { /glob "127.0.0.1" /type "allow" }
}
```

For information about glob properties, see [Designing Patterns for glob Properties](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#designing-patterns-for-glob-properties).


**CAUTION**: It is recommended that you define the `/allowedClients`. If it is not done, any client can issue a call to clear the cache. If done repeatedly, it can severely impact the site performance.

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#limiting-the-clients-that-can-flush-the-cache)
