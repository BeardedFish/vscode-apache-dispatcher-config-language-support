The `$include` function is used to include other files into the current Dispatcher configuration file.

You can include other files that contribute to the configuration:
- If your configuration file is large, you can split it into several smaller files (that are easier to manage), and include each one.
- To include files that are generated automatically.

For example, to include the file `myFarm.any` in the `/farms` configuration use the following code:

```
/farms {
	$include "myFarm.any"
}
```

To specify a range of files to include, use the asterisk (*) as a wildcard.

For example, if the files `farm_1.any` through to `farm_5.any` contain the configuration of farms one to five, you can include them as follows:

```
/farms {
	$include "farm_*.any"
}
```

---

**Source:**

https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#dispatcher-configuration-files
