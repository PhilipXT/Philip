import { Feather } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function QrScannerScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "white" }}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "white" }}>No camera permission granted</Text>

        <Pressable onPress={requestPermission} style={styles.button}>
          <Text style={{ color: "white" }}>Grant Permission</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      {/* Close Button */}
      <Pressable
        onPress={() => router.back()}
        style={styles.closeBtn}
      >
        <Feather name="x" size={24} color="white" />
      </Pressable>

      {/* Scanner */}
      <CameraView
        style={styles.camera}
        onBarcodeScanned={({ data }) => {
          if (scanned) return;

          setScanned(true);

          alert(`QR Code Scanned:\n${data}`);

          // Optional: go back after scan
          setTimeout(() => router.back(), 500);
        }}
      />

      {/* Scan frame overlay (optional visual guide) */}
      <View style={styles.scanFrame} />

      {/* Reset scan button */}
      {scanned && (
        <Pressable
          onPress={() => setScanned(false)}
          style={styles.resetBtn}
        >
          <Text style={{ color: "white" }}>Scan Again</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  camera: {
    flex: 1
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  closeBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 25
  },
  resetBtn: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 10
  },
  button: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#333",
    borderRadius: 8
  },
  scanFrame: {
    position: "absolute",
    top: "30%",
    left: "15%",
    right: "15%",
    bottom: "30%",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 20
  }
});