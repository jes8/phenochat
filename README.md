# PhenoChat

This project is built using React Native.


## Prerequisites

Node, Xcode, JDK, Android Studio are required.

For React Native prerequisites, please follow 'Building Projets with Native Code' in React Native Document (https://facebook.github.io/react-native/docs/getting-started.html)

rnpm is required by react-native-sqlite-storage (please see https://github.com/andpor/react-native-sqlite-storage)


## Testing

### iOS simulator

To run on iOS simulator:

```
# Check list of available devices in Xcode or run below cmd
xcrun simctl list devices

# Run on simulator
react-native run-ios --simulator="iPhone 4s"
```

### iOS device

Do so in Xcode but will need apple dev account (for more details, refer to https://facebook.github.io/react-native/docs/running-on-device.html)

### Android emulator

To run on Android emulator, start the emulator by running:

```
# Start emulator (macOS)
/Users/<home>/Library/Android/sdk/tools/emulator -avd Nexus_5X_API_23
```

Then run on emulator

```
# Make sure emulator can be seen in adb
adb devices

# And run
react-native run-android
```

### Android device

To run on android device, make sure device can be seen in adb devices (might need to enable USB debugging option in android Settings > System > Developer options)

(For more details, refer to https://facebook.github.io/react-native/docs/running-on-device.html)

```
# Make sure device can be seen in adb
adb devices

# And run
react-native run-android
```
