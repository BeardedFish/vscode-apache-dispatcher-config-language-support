import {
	AVAILABLE_FARMS_DIRECTORY,
	CACHE_DIRECTORY,
	CLIENT_HEADERS_DIRECTORY,
	ENABLED_FARMS_DIRECTORY,
	FILTERS_DIRECTORY,
	RENDERS_DIRECTORY,
	VIRTUAL_HOSTS_DIRECTORY
} from "@language-server/constants/directory";
import { ApacheDispatcherNamespace } from "@language-server/core/schema";
import * as path from "path";

type DispatcherNamespaceLookupTable = {
	[directoryName: string]: ApacheDispatcherNamespace
}

const DISPATCHER_NAMESPACE_LOOKUP_TABLE: DispatcherNamespaceLookupTable = {
	[AVAILABLE_FARMS_DIRECTORY]: ApacheDispatcherNamespace.AvailableFarms,
	[CACHE_DIRECTORY]: ApacheDispatcherNamespace.Cache,
	[CLIENT_HEADERS_DIRECTORY]: ApacheDispatcherNamespace.ClientHeaders,
	[ENABLED_FARMS_DIRECTORY]: ApacheDispatcherNamespace.EnabledFarms,
	[FILTERS_DIRECTORY]: ApacheDispatcherNamespace.Filters,
	[RENDERS_DIRECTORY]: ApacheDispatcherNamespace.Renders,
	[VIRTUAL_HOSTS_DIRECTORY]: ApacheDispatcherNamespace.VirtualHosts
};

export function getDispatcherNamespace(documentUri: string): ApacheDispatcherNamespace {
	const parentDirectory: string = path.basename(path.dirname(documentUri));
	const namespace: ApacheDispatcherNamespace = DISPATCHER_NAMESPACE_LOOKUP_TABLE[parentDirectory];

	if (namespace !== undefined) {
		return namespace;
	}

	return ApacheDispatcherNamespace.Global;
}
