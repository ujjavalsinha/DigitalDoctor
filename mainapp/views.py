from django.shortcuts import render
from gtts import gTTS
import pandas
import numpy
import json
from django.http import HttpResponse, FileResponse,JsonResponse
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score, confusion_matrix
from sklearn.preprocessing import StandardScaler
import seaborn
import matplotlib.pyplot as plt
from django.views.decorators.csrf import csrf_exempt
import threading
# from /"+ self.app_name+".models import Users
from joblib import dump, load
import os
from .models import CustomUser,Reading,Answers
from django.core import serializers
from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache

index = never_cache(TemplateView.as_view(template_name='index.html'))

class DigDoc:
    def __init__(self):
        self.app_name = "mainapp"
        self.cva_path = "./"+ self.app_name+"/Resources/training_data_set.csv"
        self.model = None
        self.thread = threading.Thread()
        self.new_entries = "./"+ self.app_name+"/Resources/Users.csv"

    def text_to_speech(self, req, input):
        """

        :param req:
        :param input:
        :return:
        """
        text = "Something went wrong. please try again later" if not input else input
        lang = "en"
        voice = gTTS(text=text, lang=lang, slow=False)
        voice.save("c:\\voice.mp3")
        return FileResponse(open("c:\\voice.mp3", "rb"))

    def tst(self, req):
        """

        :param req:
        :return:
        """
        render(req, "home.html")

    def append_data(self, newrow):
        """

        :param newrow:
        :return:
        """
        data = pandas.read_csv(self.new_entries)
        data = data.append(newrow, ignore_index=True)
        data.to_csv(self.new_entries, index=False)
        return True

    def train_model(self, file):
        """

        :return:
        """
        self.x = file.drop('risk', axis=1)
        self.y = file["risk"]
        x_train, x_test, y_train, y_test = train_test_split(self.x, self.y, test_size=0.2)
        # sc = StandardScaler()
        # x_train = sc.transform(x_train)
        # x_test = sc.transform(x_test)
        self.model = LogisticRegression(multi_class="multinomial", max_iter=10000, random_state=0).fit(x_train, y_train)
    #   Plot
    #     fig, ax = plt.subplots(figsize=(8, 8))
    #     ax.imshow(con_mat)
    #     ax.grid(False)
    #     ax.set_xlabel('Predicted outputs', fontsize=10, color='black')
    #     ax.set_ylabel('Actual outputs', fontsize=10, color='black')
    #     ax.xaxis.set(ticks=range(4))
    #     ax.yaxis.set(ticks=range(4))
    #     # ax.set_ylim(9.5, -0.5)
    #     for i in range(4):
    #         for j in range(4):
    #             ax.text(j, i, con_mat[i, j], ha='center', va='center', color='black')
        # plt.show()
        dump(self.model, "./"+ self.app_name+"/DigDoc_model.pkl")
        plot1 = seaborn.displot(x="risk", data=file, legend=True)
        plot1.savefig("./"+ self.app_name+"/Output/Total_count.png")
        test_op = self.model.predict(x_test)
        print("Accuracy:", accuracy_score(y_test, test_op))
        con_mat = confusion_matrix(y_test, test_op)
        print(con_mat)
        print(classification_report(y_test, test_op))
        return True

    @csrf_exempt
    def answers_detail_view(self,request,id):
        if request.method == "POST":
            request = json.loads(request.body.decode('utf-8'))
            print("REQUEST =====" ,request)
            answer1 = request[0]
            answer2 = request[1]
            answer3 = request[2]
            answer4 = request[3]
            AnswerData = Answers(reading_id=id,travelhistory = answer1,heartpatient = answer2,familyinfected = answer3,shortnessbreath=answer4)
            AnswerData.save()
            return HttpResponse("Answers submitted")

        answers = Answers.objects.filter(reading_id = id)
        serialized_answers = list(answers.values())[0]
        return JsonResponse(serialized_answers,safe=False)

    @csrf_exempt
    def reading_detail_view(self,request,input,id):
        readings = Reading.objects.filter(user_id=input,id = id)
        json_reading = readings.values()[0]
        return JsonResponse(json_reading)

    @csrf_exempt
    def user_answer_view(self,request,input):
        readings = Reading.objects.filter(user_id=input)
        reading_ids = [reading['id'] for reading in list(readings.values())]
        print(reading_ids)
        answers = []
        for ID in reading_ids:
            answer = Answers.objects.filter(reading_id = ID)
            answer = list(answer.values())[0]
            answers.append(answer)
        return JsonResponse(answers,safe=False)

    @csrf_exempt
    def predict_op(self, req, input):
        """

        :param req:
        :return:
        """
        file = pandas.read_csv(self.cva_path)
        try:
            self.model = load("./"+ self.app_name+"/DigDoc_model.pkl")
            print("model available")
        except:
            print("model not available")
            self.train_model(file)
        if req.method == "POST":
            request = json.loads(req.body.decode('utf-8'))
            temp = float(request['temperature'])
            age = int(request['age'])
            cough = int(request['cough'])
            oxi = float(request['oximeter'])
            # data = [[temp, cough, oxi]]
            data = numpy.array([age, temp, cough, oxi]).reshape(1, -1)
            op = self.model.predict(data)
            new_row = {"age": age,
                    "temperature": temp,
                    "cough": cough,
                    "oximeter": oxi,
                    "risk": op[0]
                    }
            self.append_data(new_row)
            # t1 = threading.Thread(target=self.analize, args=(file,))
            # if self.thread.is_alive():
            #     self.thread.join()
            # t1.start()
            # self.thread = t1
            
            reading = Reading(user_id=input,temperature=temp,age=age,cough=cough,oximeter=oxi,risk=op[0])
            reading.save()
            last_reading = Reading.objects.filter(user_id=input).last()
            print("LAST READING : ",last_reading.id,last_reading.temperature,last_reading.user_id,last_reading.pk,last_reading.oximeter,last_reading.cough)
            # print(last_reading.values())
            # last_reading_id = last_reading.values()[0]['id']
            return HttpResponse(last_reading.pk)
            
        readings = Reading.objects.filter(user_id=input)
        serialized_readings = list(readings.values())
        
        print("READINGS ----",list(readings.values()))
        return JsonResponse(serialized_readings,safe=False) 

    @csrf_exempt
    def user_view(self, request):
        users = CustomUser.objects.all()
        
        if request.method == "POST":
            
            print(request.body)
            request = json.loads(request.body.decode('utf-8'))
            username = request["username"]
            email = request["email"]
            city = request["city"]
            mobile = request["mobile"]
            # print("USERNAME : ",username)
            UserData = CustomUser(username=username, email=email, city=city,mobile=mobile)
            UserData.save()
            users = CustomUser.objects.all()
            data = {'users':[user for user in users.values()]}
            return JsonResponse(data)
        data = {'users':[user for user in users.values()]}
        return JsonResponse(data)

    @csrf_exempt
    def user_detail_view(self, request,  input):
        user = CustomUser.objects.filter(pk=input)
        data = user.values()[0]
        print(data)
        return JsonResponse(data)
        


if __name__ == '__main__':
    a = DigDoc()
    # cva_path = "../Resources/sample.cva"
    # d = {"age": 10,
    #      "temp": 10,
    #      "cough": 10,
    #      "oxi": 10,
    #      "risk": "lig"
    #      }
    # a.append_data(d)
    # a.analize()
    os.chdir("../")
    file = pandas.read_csv(a.cva_path)
    a.train_model(file)
