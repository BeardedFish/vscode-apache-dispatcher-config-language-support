Any file system-oriented system call can be interrupted `EINTR` if the object of the system call is on a remote system accessed by way of NFS. Whether these system calls can time out or be interrupted is based on how the underlying file system was mounted on the local machine.

Use the `/ignoreEINTR` parameter if your instance has such a configuration and the log contains the following message:

`Error while reading response: Interrupted system call`

Internally, Dispatcher reads the response from the remote server using a loop that can be represented as:

```java
while (responseNotFinished) {
	// read more data
}
```

Such messages can be generated when the EINTR occurs in the `read more data` section and are caused by the reception of a signal before any data was received.

To ignore such interrupts, you can add the following parameter to dispatcher.any (before /farms):

`/ignoreEINTR "1"`

Setting `/ignoreEINTR` to `1` causes Dispatcher to continue to attempt to read data until the complete response is read. The default value is `0` and deactivates the option.

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#ignoring-interruption-errors-ignoreeintr)
