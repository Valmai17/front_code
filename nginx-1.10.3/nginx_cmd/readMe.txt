1. ��ѹnginx-1.10.3.zip

2. �޸ı�Ŀ¼�µ�nginx.conf�ļ�
	�޸�{LOCAL_STATIC_FILE}��{SERVER_ADDR}Ϊ��Ӧ�ĵ�ַ

	�ο���
	http://blog.csdn.net/tdcqfyl/article/details/51992758
	http://www.tuicool.com/articles/7r2Uze
	http://www.tuicool.com/articles/6JZNjuu
	http://blog.csdn.net/zhangliangzi/article/details/52143358
	http://www.cnblogs.com/souvenir/p/5647504.html

2. �ñ�¼���޸ĺ��nginx.conf�滻��nginxԭ���������ļ�nginx-1.10.3\conf\nginx.conf

3. �滻����nginx_cmd������bat�ļ���{NGINX_ROOT}Ϊ�Լ�NGINX�ĸ�·��
   �滻��Ϻ����ͨ��run.bat������ reload.bat�����¼����޸ĺ�������ļ��� quit.bat���а�ȫ�˳��� stop����ǿ���˳�
   �ο���http://blog.csdn.net/ppby2002/article/details/38681345
   
4. ����js�з��ʵ�api�ӿ�·��Ϊ���õ�{SERVER_ADDR}, ����ngnix����в��Է���

ע�⣺
	#ǰ��ajax������Ҫ���ÿ��򣬺����Ҫ���������������,
	
	1. jquery������Ҫ�������£�
	 $.ajax({
        // ... ��������
        xhrFields: {  
            withCredentials: true//��ʾ����ƾ֤�������Խ����ʾֻ�ᷢ��jsessionid����ͨ��cookie���ᷢ��!  
        },
		// ... ��������
	});
	�ο���http://blog.csdn.net/liangklfang/article/details/48247691
	
	
	2. vue��vue-resource������Ҫ�������£�
	Vue.http.interceptors.push(function(req, next){
	
		// ... ��������
		
		//��������޷�����cookies���� �� 
			req.credentials=true;
		}
		
		// ... ��������
	)
	�ο���https://github.com/pagekit/vue-resource/issues/323

			
