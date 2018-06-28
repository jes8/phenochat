# PhenoChat

PhenoChat is an open-source phenotyping application for mobile devices. It helps users build phenotypic descriptions using medical terminologies provided by the Human Phenotype Ontology (HPO). Users can build the descriptions either by (a) specifying individual phenotype terms, or (b) specifying a disease and then selecting key phenotypic features of the disease. Upon completion, the descriptions can be sent by email or copied to clipboard for pasting in other messaging applications. The descriptions are formatted in a way that can be automatically parsed.

This project is built using React Native.

## Formatted phenotype description example

Note: "##" marks the header of a file. Phenotypes are listed under `##phenotypes`. Diseases are listed under `##suspected_diagnoses`.

```
##phenochat_description
##phenotypes
##format=hpo_id,hpo_name
HP:0031053,Coarctation in the transverse aortic arch
HP:0000930,Elevated imprint of the transverse
##suspected_diagnoses
##format=MIM_number,OMIM_name
101900,Acrokeratosis verruciformis
```

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


## Resources used

1. Human Phenotype Ontology (HPO) (for phenotype terms and synonyms) [link](https://hpo.jax.org/)

2. Online Mendelian Inheritance in Man (OMIM) API (disease names and synonyms) [link](https://www.omim.org/)

