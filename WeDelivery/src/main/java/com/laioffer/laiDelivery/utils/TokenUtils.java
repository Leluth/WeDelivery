package com.laioffer.laiDelivery.utils;

import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.Random;
import java.util.regex.Pattern;

/**
 * @author Shaoshuai Xu
 * @version 1.0
 * @description: TokenUtils
 * @date 2022/1/1 14:49
 */
public class TokenUtils {
    private TokenUtils(){}

    //定义ID位移量
    private static Integer shiftAmount = 2;
    //定义横向参数
    private static Long crossrangeAmount = 3L;
    //定义纵向参数
    private static Long portraitAmount = 21L;
    //定义前随机数位数
    private static Integer Y_Random = 4;
    //定义后随机数位数
    private static Integer Q_Random = 3;

    //通过Id生成Token串
    public static String getToken(Integer userId){
        //定义一个Buffer的Token串
        StringBuilder token = new StringBuilder();
        //先位移
        Long restoreForIdNum = changeForId(userId);
        //再混淆
        Long confusionId = confusionOperationId(restoreForIdNum);
        token.append(confusionId);
        //分割符
        token.append("|");
        //加入Y随机数
        token.append(getYRandomString(Y_Random));
        //加入用户ID
        token.append(getUseridOnBase(userId));
        //加入Q随机数
        token.append(getQRandomString(Q_Random));
        //返回Token
        return token.toString();
    }

    //token校验及userID解析
    public static Integer restoreToken(String token){
        //判断格式是否正确
        String pattern = ".*\\|.*";
        boolean isMatch = Pattern.matches(pattern, token);
        if(isMatch){
            //拆分
            String[] array = token.split("\\|");
            //ID算法串
            String truesIDStr = array[0];
            //用户ID串
            String userIdStr = array[1];
            if(truesIDStr.equals("") || userIdStr.equals("")){
                return -1;
            }
            //切分用户ID串
            String baseID = userIdStr.substring(Y_Random,userIdStr.length()-Q_Random);
            String baseIDStr = getBaseOnUserid(baseID);
            return Integer.valueOf(baseIDStr);
        }else{
            return -1;
        }
    }

    //Id移位
    public static Long changeForId(Integer userId){
        String number = userId.toString();
        String[] array = number.split("");
        StringBuilder newNumber = new StringBuilder();
        //如果满足位移量，则按照位移量位移，如果不满足，则按照最低位移量位移
        if(array.length>shiftAmount){
            for(int run=shiftAmount;run<array.length;run++){
                newNumber.append(array[run]);
            }
            for(int run=0;run<shiftAmount;run++){
                newNumber.append(array[run]);
            }
        }else{
            if(array.length>1){
                for(int run=1;run<array.length;run++){
                    newNumber.append(array[run]);
                }
                newNumber.append(array[0]);
            }else{
                newNumber.append(array[0]);
            }
        }
        return Long.valueOf(newNumber.toString());
    }

    //id混淆计算
    public static Long confusionOperationId(Long newId){
        //公式：aX+2ab-b = y
        return newId*crossrangeAmount+2*portraitAmount*crossrangeAmount-portraitAmount;
    }

    //Y随机数，末尾为数字
    public static String getYRandomString(Integer length){
        String str="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        String strNext="0123456789";
        Random random=new Random();
        StringBuffer sb=new StringBuffer();
        for(int i=0;i<length-1;i++){
            int number=random.nextInt(36);
            sb.append(str.charAt(number));
        }
        int numberNext=random.nextInt(10);
        sb.append(strNext.charAt(numberNext));
        return sb.toString();
    }

    //Q随机数，第一位为数字
    public static String getQRandomString(Integer length){
        String str="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        String strNext="0123456789";
        Random random=new Random();
        StringBuffer sb=new StringBuffer();
        int numberNext=random.nextInt(10);
        sb.append(strNext.charAt(numberNext));
        for(int i=1;i<length;i++){
            int number=random.nextInt(36);
            sb.append(str.charAt(number));
        }
        return sb.toString();
    }

    //userId的Base64位算法
    public static String getUseridOnBase(Integer userId){
        Base64.Encoder encoder = Base64.getEncoder();
        String text = userId.toString();
        String encodedText = "";
        try {
            final byte[] textByte = text.getBytes("UTF-8");
            encodedText = encoder.encodeToString(textByte);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return encodedText;
    }

    //ID解密
    public static String getBaseOnUserid(String userId){
        Base64.Decoder decoder = Base64.getDecoder();
        String userID = "";
        try {
            userID = new String(decoder.decode(userId), "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return userID;
    }
}
