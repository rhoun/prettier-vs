This version of prettier produces more compact JSON that is still readable by using one-line objects when it is not longer than 'printWidth' in config (80 by default).

I probably broke a few core principles of prettier here, but whatever, the intended usage is limited to modding Vintage Story, so it's easier to work with JSON files there.

It does two runs for formatting:
1. Default prettier without any changes.
2. Custom check for current node length. If it's less than printWidth - we print the node using basic JSON.stringify with some spaces to keep it readable.

Let me know if you have any ideas or if something doesn't work.

Enjoy!

