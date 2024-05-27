# air-travel-api-assessment
A technical assessment for VolumeFi

## How to Use
To use this API you can you a tool like Postman or curl, below is an example with curl:

`curl -X POST http://localhost:8080/calculate -H "Content-Type: application/json" -d '{"flights": [["IND", "EWR"], ["SFO", "ATL"], ["GSO", "IND"], ["ATL", "GSO"]]}'`

An important detail to note here is that we pass the data in JSON format and under the "flights:" key. Without this key the data won't be read. Also, the API enforces that all data be an array, with nested arrays of 2 elements (specifically 2 IATA codes). Currently there's nothing stopping someone from passing gibberish as IATA codes, but this could be easily improved by either having a local copy of all the codes to references, or by referencing this data via a third-party API. Also, this API assumes that all the data you pass it is related, if unrelated then expect inaccurate results. In order to enforce relationships in the data that a user provides would be more troublesome, but it could be done if given enough thought and time.

## Common Questions
You might be thinking, why only nested arrays with 2 elements / IATA codes?

Well the assumption is that the data is similar to what you'd see on a plane ticket. On a plane ticket you'd only have the information that states where you're departing from and where you're heading to. Formatting the data in the way is realistic and reflective of how flights work in the real world. That said, we could possibly add support for things like nested arrays with 3 or more uneven number of data points, as well as support for an even number of elements that totals more than 2 in a nested array. Just like with enforcing data relationships, this too poses a bit of a troublesome issue that can be resolved but would require some heavy lifting.

## Comments / Concerns & Contributing
If you have any comments / concerns or if you'd like to contribute to this repo, then you are welcome to either reach out to macalleegoldman@protonmail.com or to create a PR for this repo's main branch.
