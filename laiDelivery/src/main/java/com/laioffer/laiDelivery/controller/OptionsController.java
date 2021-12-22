package com.laioffer.laiDelivery.controller;


import com.google.maps.errors.ApiException;
import com.laioffer.laiDelivery.entity.ItemInfo;
import com.laioffer.laiDelivery.entity.OptionsInfo;
import com.laioffer.laiDelivery.service.OptionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.List;

@Controller
public class OptionsController {

    @Autowired
    private OptionsService optionsService;

    @RequestMapping(value = "/options", method = RequestMethod.POST)

    @ResponseBody
    public List<OptionsInfo> getOptions(@RequestBody ItemInfo itemInfo) throws IOException, InterruptedException, ApiException {
        return optionsService.getOptions(itemInfo);
    }
}
