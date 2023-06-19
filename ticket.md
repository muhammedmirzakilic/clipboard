# 1 - Create new column in db

Add new column to 'Agents' table.

Column

    Name: CustomId
    Type: String/nvarchar
    Nullable: true
    Default: null

# 2 - Create new endpoint for updating customId

Implement new endpoint for updating custom ids for agents.

Request: 

`{
    facilityId:1,
    agentId: 2,
    customId: "@john"
}`

Response: 

`
{
    result: ok
}
`

# 3 - Update getShiftsByFacility function

Add customId field to agents in getShiftsByFacility method.

`
[{
    ...
    agent: {
        ...,
        customId: 3
    }
}]
`

# 4 - Update generateReport function

Render customId field insted of id for agents while generating report.

NOTICE:

@PM what should we do if customId is not available(null). Should we continue rendering id field? 