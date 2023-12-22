The directory that stores the session information. If the directory does not exist, it is created.

**CAUTION**: When configuring the directory sub-parameter, do not point to the root folder (`/directory "/"`) as it can cause serious problems. Always specify the path to the folder that stores the session information. For example:

```
/sessionmanagement {
	/directory "/usr/local/apache/.sessions"
}
```

---

**Source:**

https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#enabling-secure-sessions-sessionmanagement
