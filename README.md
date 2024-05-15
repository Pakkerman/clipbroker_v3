# Clipbroker-v3

## TODOs

- [x] Deploy

- [x] Connect database
- [x] Create text
- [x] Show created text
- [x] Delete text

### Auth

- [x] Create user table
- [x] Auto assign board when users login at '/' and have no session cookie
- [x] Login user and update session when user visit with /:id

- [ ] Locking board with pin

  - [ ] Allow user to set pin to lock board

- [x] Logout user ( clean up session cookie )

- [ ] Board sharing
  - [ ] Embed board id and pin in url for quick sharing
  - [ ] QRcode scan on the screen, for quick share with device with camera

### Styling/UI

- [x] Shadcn/ui
- [x] AutoAnimate

## USER STORY

### Login flow

#### Two main ways to enter access the board

#### 1. via Home page

One is via the home page, where user is asked of a alias for using a brand new clipboard or a previous chosen one.

- a. if user is new (means that user has no cookie of last visited id), we will generated a new one for them, and autofill the input, and user can still choose what they want, or just use the generate one and change later.

- b. if user has been here before and logged out (cookie will hold a last visited alias) and this alias will be filled in for the user, user can still choose a new one, we just dont generate a random one for them

Once user enter from the home page, there are 2 scenario,

- a. the board is locked (pin is set by provious user on this board)
  User will have to enter the correct pin for the pin to enter

- b. the board is unlocked (either this is a new board that never been used before or have been used and hasn't set a pin)
  User is able to start using right away, the pin prompt will be skipped

#### 2. via URL

This method enables fast sharing of the same board to another device,like qrcode scanning. Once user obtain the url, can immediately enter the board and start sharing between devices.

example: https://clipbroker/{alias}?pin={pin}

After user enter URL one of 4 scenario will happen

- URL contains only alias

  - alias not in db

    - create new user

  - alias in db
    - locked, prompt for pin
    - unlocked, login

- URL contains alias and pin

  - alias not in db

    - create new user, and set pin

  - alias in db

    - correct pin, login

    - wrong pin, prompt for pin
