# Array-explanations

## Format:

```
> Table
    > Row
        > Explanation | Type
```

## APIKeys

The `owner`-field, array:

- Field: `["Username","User ID"]`
- Type: ` [string:string]`
- Usecase: Used to identify who the key belongs to.
- Example: `["Hawk","592779895084679188"]`

#

## Users

The `roles`-field, array:

- Field: `["Extra","Roles","Here"]`
- Type `string[]`
- Usecase: To add more roles to the user, if they possess them.
- Example: `["Admin", "Developer"]`, `["Owner", "Developer"]`

#

The `scoresaberdata`-field, array:

- Field: `["ScoresaberID", GlobalRank, CountryRank, "CountryShortcode"]`
- Type:

```
ScoreSaber {
  id: string;
  rank: number;
  countryrank: number;
  country: string;
}
```

- Usecase: Used to identify the users ScoreSaber-account.
- Example: `["76561198086326146",52,2007,"DK"]`

#

The `previous_tourneys`-field, array:

- Field: `{"tournaments": []}`
- Type:

```
export interface User {
    ...
    previous_tourneys: PlayerTournament[];
    ...
}

export interface PlayerTournament {
  ID: number;
  Name: string;
  FinishedPlacement?: number;
  Rated: boolean;
}
```

- Usecase: Used to store the tournaments, that the user previously participated in + if they "upvoted" the tournament organizer.
- Example:

```
{
	"tournaments": [{
			"ID": 1,
			"Name": "Tournament 1",
			"Placement": 1,
			"Rated": 0
		},
		{
			"ID": 2,
			"Name": "Tournament 2",
			"Placement": 3,
			"Rated": 0
		}
	]
}
```

- Note: "Rated" will **not** be shown on the public API, to prevent abuse from organizers who might pressure people into voting.

#

## Rules

The `rule`-field, array:

- Field: `["Rule","Here"]`
- Type: `string[]`

- Usecase: Used to store the rules of the tournament.
- Example: `["Rule 1", "Rule 2", "Rule 3"]`

#