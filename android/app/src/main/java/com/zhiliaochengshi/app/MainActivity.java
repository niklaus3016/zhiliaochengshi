package com.zhiliaochengshi.app;

import android.os.Bundle;
import android.view.Window;
import androidx.appcompat.app.AppCompatDelegate;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        // 应用级强制启用深色 night mode，避免系统浅色设置带偏启动页/状态栏/WebView 底色
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES);

        // 启动页/状态栏/导航栏统一使用墨黑 #131616，与 Web 端 bg-paper-dark 完全一致
        Window window = getWindow();
        if (window != null) {
            try {
                int inkBlack = 0xFF131616;
                window.setStatusBarColor(inkBlack);
                window.setNavigationBarColor(inkBlack);
            } catch (Throwable ignore) {
                // 旧机型可能不支持 setNavigationBarColor，忽略
            }
        }

        super.onCreate(savedInstanceState);
    }
}
