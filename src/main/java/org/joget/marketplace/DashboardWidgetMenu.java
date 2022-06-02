package org.joget.marketplace;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import org.joget.apps.app.service.AppPluginUtil;
import org.joget.apps.app.service.AppUtil;
import org.joget.apps.userview.model.UserviewMenu;
import org.joget.plugin.base.PluginManager;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.joget.plugin.base.PluginWebSupport;

public class DashboardWidgetMenu extends UserviewMenu implements PluginWebSupport{
    private final static String MESSAGE_PATH = "messages/DashboardWidgetMenu";
 
    public String getName() {
        return "Dashboard Widget";
    }
    public String getVersion() {
        return "7.0.0";
    }
    
    public String getClassName() {
        return getClass().getName();
    }
    
    public String getLabel() {
        //support i18n
        return AppPluginUtil.getMessage("org.joget.marketplace.DashboardWidgetMenu.pluginLabel", getClassName(), MESSAGE_PATH);
    }
    
    public String getDescription() {
        //support i18n
        return AppPluginUtil.getMessage("org.joget.marketplace.DashboardWidgetMenu.pluginDesc", getClassName(), MESSAGE_PATH);
    }
 
    public String getPropertyOptions() {
        return AppUtil.readPluginResource(getClassName(), "/properties/DashboardWidgetMenu.json", null, true, MESSAGE_PATH);
    }

    @Override
    public String getCategory() {
        return "Marketplace";
    }

    @Override
    public String getIcon() {
        //reusing the icon of other plugin here
        return "/plugin/org.joget.apps.userview.lib.HtmlPage/images/grid_icon.gif";
    }
    
    @Override
    public boolean isHomePageSupported() {
        return true; // Can use as first page of the userview
    }
    
    @Override
    public String getDecoratedMenu() {
        return null; // using default
    }

    @Override
    public String getRenderPage() {
        Map model = new HashMap();
        model.put("request", getRequestParameters());
        model.put("element", this);
        model.put("widgets", getProperty("widgets"));
        
//        //need to process styling
//        Map widgets = (Map)getProperty("widgets");
//        
//        
//        
//        Object optionProperty = getProperty("widgets");
//        if (optionProperty != null && optionProperty instanceof Collection) {
//            for (Object opt : ((ArrayList) optionProperty)) {
//                Map optMap = ((Map)opt);
//                Object value = optMap.get("value");
//                Object label = optMap.get("label");
//            }
//        }
        
        PluginManager pluginManager = (PluginManager)AppUtil.getApplicationContext().getBean("pluginManager");
        String content = pluginManager.getPluginFreeMarkerTemplate(model, getClass().getName(), "/templates/DashboardWidgetMenu.ftl", MESSAGE_PATH);
        return content;
    }
    
    public void webService(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PluginManager pluginManager = (PluginManager)AppUtil.getApplicationContext().getBean("pluginManager");
        String script = AppUtil.readPluginResource(getClass().getName(), "/resources/DashboardWidgetProperty.js", null, false, MESSAGE_PATH);
        response.getWriter().write(script);
    }
}
