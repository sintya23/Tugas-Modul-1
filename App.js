import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const CameraRoll = {
  getPhotos: async (params = { first: 10, assetType: 'Photos' }) => {
    const total = params.first || 10;
    
    const galleryItems = [
      { id: '1', name: 'Foto_Wisata_01.jpg', uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80' },
      { id: '2', name: 'Foto_Gunung_02.jpg', uri: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80' },
      { id: '3', name: 'Foto_Hutan_03.jpg', uri: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&q=80' },
      { id: '4', name: 'Foto_Kota_04.jpg', uri: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=500&q=80' },
      { id: '5', name: 'Foto_Danau_05.jpg', uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80' },
      { id: '6', name: 'Foto_Arsitektur_06.jpg', uri: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&q=80' },
      { id: '7', name: 'Foto_Sunset_07.jpg', uri: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=500&q=80' },
      { id: '8', name: 'Foto_Pantai_08.jpg', uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80' },
      { id: '9', name: 'Foto_Bunga_09.jpg', uri: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500&q=80' },
      { id: '10', name: 'Foto_Kopi_10.jpg', uri: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80' },
    ];

    return {
      edges: galleryItems.slice(0, total).map((item) => ({
        node: {
          id: item.id,
          image: { uri: item.uri },
          filename: item.name,
        },
      })),
    };
  },
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      loading: false,
    };
  }

  handleShowAlert = () => {
    Alert.alert(
      'Informasi',
      'Primakara Luar Biasa',
      [{ text: 'OK' }],
      { cancelable: true }
    );
  };

  handleLoadCameraRoll = async () => {
    try {
      this.setState({ loading: true });

      const response = await CameraRoll.getPhotos({
        first: 10,
        assetType: 'Photos',
      });

      this.setState({
        photos: response.edges,
        loading: false,
      });

      Alert.alert(
        'Berhasil',
        `Berhasil memuat ${response.edges.length} gambar!`
      );
    } catch (error) {
      this.setState({ loading: false });
      Alert.alert('Gagal', error.message);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.courseBadge}>MODUL I</Text>
            <Text style={styles.title}>BASIC COMPONENT, LAYOUTING, STYLING</Text>
            <Text style={styles.subtitle}>Tugas Mandiri Pemrograman Mobile</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.button, styles.alertButton]}
              onPress={this.handleShowAlert}
            >
              <Text style={styles.buttonText}>1. Tampilkan Alert Primakara</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.button, styles.cameraRollButton]}
              onPress={this.handleLoadCameraRoll}
            >
              <Text style={styles.buttonText}>
                {this.state.loading
                  ? 'Memuat Galeri...'
                  : '2. Tampilkan 10 Gambar (CameraRoll)'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.galleryContainer}>
            <View style={styles.galleryHeader}>
              <Text style={styles.sectionTitle}>
                Hasil Tampilan Galeri ({this.state.photos.length}/10 Gambar)
              </Text>
            </View>

            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {this.state.photos.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyIcon}>🖼️</Text>
                  <Text style={styles.emptyText}>
                    Belum ada gambar yang dimuat.
                  </Text>
                  <Text style={styles.emptySubtext}>
                    Tekan tombol "2. Tampilkan 10 Gambar (CameraRoll)" di atas.
                  </Text>
                </View>
              ) : (
                <View style={styles.gridContainer}>
                  {this.state.photos.map((item, index) => (
                    <View key={item.node.id || index} style={styles.card}>
                      <Image
                        source={{ uri: item.node.image.uri }}
                        style={styles.image}
                        resizeMode="cover"
                      />
                      <View style={styles.cardCaption}>
                        <Text style={styles.captionBadge}>#{index + 1}</Text>
                        <Text
                          style={styles.captionText}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {item.node.filename}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 35 : 10,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  courseBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0284C7',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 10,
    marginBottom: 14,
  },
  button: {
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  alertButton: {
    backgroundColor: '#2563EB',
  },
  cameraRollButton: {
    backgroundColor: '#059669',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  galleryContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  galleryHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 110,
    backgroundColor: '#E5E7EB',
  },
  cardCaption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    gap: 4,
  },
  captionBadge: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  captionText: {
    fontSize: 11,
    color: '#4B5563',
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 45,
  },
  emptyIcon: {
    fontSize: 44,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});