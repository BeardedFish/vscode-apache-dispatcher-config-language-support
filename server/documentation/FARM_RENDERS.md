The `/renders` property defines the URL to which Dispatcher sends requests to render a document. The following example `/renders` section identifies a single AEM instance for rendering:

```
/renders {
	/myRenderer {
		# Hostname or IP of the renderer
		/hostname "aem.myCompany.com"
		# Port of the renderer
		/port "4503"
		# Connection timeout in milliseconds, "0" (default) waits indefinitely
		/timeout "0"
	}
}
```

The following example `/renders` section identifies an AEM instance that runs on the same computer as Dispatcher:

```
/renders {
	/myRenderer {
		/hostname "127.0.0.1"
		/port "4503"
	}
}
```

The following example `/renders` section distributes render requests equally among two AEM instances:

```
/renders {
	/myFirstRenderer {
		/hostname "aem.myCompany.com"
		/port "4503"
	}
	/mySecondRenderer {
		/hostname "127.0.0.1"
		/port "4503"
	}
}
```

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#defining-page-renderers-renders)
