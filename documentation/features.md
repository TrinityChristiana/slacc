Features
- Organizations
  - Create
  - ~~Read~~
  - Update
  - Delete
- Users
  - Create
  - Read
  - Update
  - Delete
- Messages
  - Create
  - Read
  - Update
  - Delete
- Channels
  - Create
  - Read
  - Update
  - Delete
- Channel Types
  - Create
  - Read
  - Update
  - Delete
- Channel Users
  - Create
  - Read
  - Update
  - Delete

Routes
## `/`
- View orgs you are apart of

## `/o/:orgId`
- Will take you to the general channel for this org
- localhost:3000/o/1

## `/o/:orgId/compose`
- Will allow user to create a DM
- localhost:3000/o/2/compose

## `/o/:orgId/:channelId`
- Will allow user to view Channel
- localhost:3000/o/3/1234

## `/o/:orgId/:channelId/thread/:threadId`
- Will allow user to view channel thread

## `/o/:orgId/:channelId/details`
- Allows user to view details of channel in a side menu

## `/o/:orgId/:channelId/user_profile/:userId`
- Allows user to view details of user in a side menu




MVP
- User can create an organization
