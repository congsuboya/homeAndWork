package com.myfirst.rn;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.myfirst.activity.NewActivity;

/**
 * Created by liuchao on 2017/4/11.
 */

public class RNConfig extends ReactContextBaseJavaModule {
    public RNConfig(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Config";
    }

    @ReactMethod
    public void push(){
        Activity activity = getCurrentActivity();
        if (activity== null){
            return;
        }
        Intent intent = new Intent(activity,NewActivity.class);
        activity.startActivity(intent);
    }

    @ReactMethod
    public void goBack(){
        Activity activity = getCurrentActivity();
        if (activity == null){
            return;
        }
        activity.finish();
    }
}
