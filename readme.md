**A simple side menu for React Native**
---------------------------------------
A very simple side menu for react-native, at it's core is the modal view so it can be placed within any component and it will work like a charm.

**[PREVIEW GIF GOES HERE]**

## Installation ##
Using npm

    npm install --save react-native-simple-side-menu

Using yarn

    yarn add react-native-simple-side-menu

I would recommend linking the native animation library which is baked into react-native for faster animations

## Usage example ##

**[EXAMPLE GOES HERE]**

##Component props##
|	Name	|	Type	|	Required 	|	Description	|
|---|---|---|---|
|	width	|	Number	|	Yes	|	The width of the side menu	|
|	color	|	String	|	Yes |	Side menu background color	|
|	menuContent	|	React Component	|	Yes	| Content which will be rendered in the side menu |

## Methods ##

###toggle###
Opens or closes the side menu based on the current state of the menu

Example:

    this._sideMenu.toggle()
