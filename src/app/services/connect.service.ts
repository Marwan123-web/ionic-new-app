import { Injectable } from '@angular/core';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Network } from '@ionic-native/network/ngx';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';
import { Platform } from '@ionic/angular';
import { WifiWizard2 } from '@ionic-native/wifi-wizard-2/ngx';
// import { Hotspot } from 'plugins/cordova-plugin-hotspot/src/HotSpotPlugin';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  success: any; failure: any;
  ssid: any; bindAll: any; password: any; algorithm: any; isHiddenSSID: any;
  options: any;
  // private hotspot: Hotspot,
  constructor(private uniqueDeviceID: UniqueDeviceID, private network: Network, private networkInterface: NetworkInterface,
    public plt: Platform, private wifiWizard2: WifiWizard2, private qrScanner: QRScanner) {
    // NetworkInterface
    this.networkInterface.getWiFiIPAddress()
      .then(address => console.info(`IP: ${address.ip}, Subnet: ${address.subnet}`))
      .catch(error => console.error(`Unable to get IP: ${error}`));

    this.networkInterface.getCarrierIPAddress()
      .then(address => console.info(`IP: ${address.ip}, Subnet: ${address.subnet}`))
      .catch(error => console.error(`Unable to get IP: ${error}`));

    const url = 'www.github.com';
    this.networkInterface.getHttpProxyInformation(url)
      .then(proxy => console.info(`Type: ${proxy.type}, Host: ${proxy.host}, Port: ${proxy.port}`))
      .catch(error => console.error(`Unable to get proxy info: ${error}`));

  }
  UniqueDeviceID() {
    this.uniqueDeviceID.get()
      .then((uuid: any) => console.log(uuid))
      .catch((error: any) => console.log(error));
  }

  Network() {
    // watch network for a disconnection
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });

    // stop disconnect watch
    disconnectSubscription.unsubscribe();


    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });

    // stop connect watch
    connectSubscription.unsubscribe();
  }

  WifiWizard2() {
    //   # Global Functions
    //  These are functions that can be used by both Android and iOS applications
    //  typescript
    this.wifiWizard2.getConnectedSSID();
    //  this.wifiWizard2.connect(this.ssid, this.bindAll, this.password, this.algorithm, this.isHiddenSSID);
    this.wifiWizard2.disconnect(this.ssid);
    this.wifiWizard2.listNetworks()
    //  this.wifiWizard2.scan([this.options])
    this.wifiWizard2.startScan()
    //  this.wifiWizard2.getScanResults([this.options])
    this.wifiWizard2.isWifiEnabled()
    this.wifiWizard2.getConnectedNetworkID()
    this.wifiWizard2.enableWifi()
    this.wifiWizard2.disableWifi()
    this.wifiWizard2.getWifiIP()
    this.wifiWizard2.getWifiRouterIP()
    this.wifiWizard2.getWifiIPInfo()
    this.wifiWizard2.reconnect()
    this.wifiWizard2.getSSIDNetworkID(this.ssid)
    this.wifiWizard2.disable(this.ssid)
    this.wifiWizard2.requestPermission()
  }

  // Hotspot() {
  //   this.hotspot.scanWifi().then((networks: HotspotNetwork[]) => {
  //     console.log(networks);
  //   });
  // }



  QRScanner() {
    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted


          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  typedArrays() {
    // ASCII only
    function stringToBytes(string) {
      var array = new Uint8Array(string.length);
      for (var i = 0, l = string.length; i < l; i++) {
        array[i] = string.charCodeAt(i);
      }
      return array.buffer;
    }

    // ASCII only
    function bytesToString(buffer) {
      return String.fromCharCode.apply(null, new Uint8Array(buffer));
    }
  }


}