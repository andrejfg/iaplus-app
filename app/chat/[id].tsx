/* eslint-disable @typescript-eslint/no-non-null-assertion */
import tw from '@/lib/tailwind'
import { Mensagem } from '@/types/Mensagem'
import { router, useGlobalSearchParams } from 'expo-router'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TextInputKeyPressEventData,
} from 'react-native'
import Toast from 'react-native-root-toast'
import useLoading from '@/hooks/useLoading'
import HeaderChat from '@/components/HeaderChat'
import { useDeviceContext } from 'twrnc'
import getMensagemByID from '@/api/getMensagemByID'
import BalaoMensagem from '@/components/BalaoMensagem'
import compareDate from '@/utils/compareDate'
import ChatInput from '@/components/ChatInput'
import sendMessageToChat from '@/api/sendMessageToChat'
import getRespostaGPT from '@/api/getRespostaGPT'
import { HomeContext } from '@/contexts/HomeContext'
import Conversa from '@/types/Conversa'
import AssistenteVirtual from '@/types/AssistenteVirtual'

export default function ChatScreen() {
  useDeviceContext(tw)
  const { id }: { id: string } = useGlobalSearchParams()
  const { assistentes, conversas, setConversas } = useContext(HomeContext)
  const [assistente, setAssistente] = useState<AssistenteVirtual>()
  const [conversa, setConversa] = useState<Conversa>()
  const [mensagens, setMensagens] = useState<Mensagem[]>([])
  const [mensagemProvisoria, setMensagemProvisoria] = useState<Mensagem>()
  const [refreshing, setRefreshing] = useState(false)
  const [userInput, setUserInput] = useState<string>('')
  const { loading, startLoading, stopLoading } = useLoading()
  const {
    loading: digitando,
    startLoading: startDigitando,
    stopLoading: stopDigitando,
  } = useLoading()
  const {
    loading: recebendo,
    startLoading: startRecebendo,
    stopLoading: stopRecebendo,
  } = useLoading()

  useEffect(() => {
    const newConversa = conversas.find((conversa) => conversa.id === id)
    if (newConversa) {
      setConversa(newConversa)
      setAssistente(
        assistentes.find(
          (assistente) => assistente.id === newConversa.virtualId,
        ),
      )
      setMensagens(newConversa.Mensagem)
    } else {
      router.replace('/conversas')
    }
  }, [])

  async function refreshChat() {
    setRefreshing(true)
    const mensagemResponse = await getMensagemByID({ id }).catch(() => {
      Toast.show('Erro ao carregar conversa.', {
        position: 50,
        backgroundColor: 'red',
        duration: Toast.durations.SHORT,
      })
      if (router.canGoBack()) router.back()
      else router.replace('/conversas')
    })
    setMensagens(mensagemResponse.Mensagem)
    setRefreshing(false)
    stopLoading()
  }

  useEffect(() => {
    startLoading()
  }, [])

  function setNewMessage(novaMensagem: Mensagem) {
    let newMensagens: Mensagem[]
    setMensagens((prev) => {
      newMensagens = [...prev, novaMensagem]
      return newMensagens
    })
    setConversas((prev) => {
      const newConversa = prev.filter(
        (oldConversa) => oldConversa.id !== conversa?.id,
      )
      return [
        ...newConversa,
        {
          ...conversa,
          Mensagem: newMensagens,
        } as Conversa,
      ]
    })
  }

  async function sendMessage() {
    startRecebendo()
    setUserInput('')
    const stringSemEspacos = userInput.replace(/^\s+|\s+$/g, '')
    setMensagemProvisoria({
      texto: stringSemEspacos,
      role: 'user',
      dataHora: new Date(),
      conversaId: '123123',
      id: '123123123',
    })
    startDigitando()
    const novaMensagem = await sendMessageToChat({
      role: 'user',
      mensagem: stringSemEspacos,
      conversaId: conversa!.id,
    }).catch(() => {
      Toast.show('Erro ao enviar mensagem.', {
        position: 50,
        backgroundColor: 'red',
        duration: Toast.durations.SHORT,
      })
    })
    setMensagemProvisoria(undefined)
    if (novaMensagem) {
      setNewMessage(novaMensagem)
      const resposta = await getRespostaGPT([...mensagens, novaMensagem]).catch(
        () => {
          Toast.show('Erro ao receber resposta.', {
            position: 50,
            backgroundColor: 'red',
            duration: Toast.durations.SHORT,
          })
        },
      )
      await assistenteResponde(resposta).catch(() => {
        Toast.show('Erro ao receber resposta.', {
          position: 50,
          backgroundColor: 'red',
          duration: Toast.durations.SHORT,
        })
      })
    }
    stopRecebendo()
    stopDigitando()
  }

  async function assistenteResponde(resposta: Mensagem) {
    const novaMensagem = await sendMessageToChat({
      role: 'system',
      mensagem: resposta.texto,
      conversaId: mensagens[0].conversaId,
    }).catch(() => {
      Toast.show('Erro ao receber resposta.', {
        position: 50,
        backgroundColor: 'red',
        duration: Toast.durations.SHORT,
      })
    })
    if (novaMensagem) setNewMessage(novaMensagem)
  }

  const messagesRef = useRef<ScrollView>(null)

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({ y: 99999, animated: true })
    }
  }, [mensagens])
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({ y: 99999, animated: true })
    }
  }, [messagesRef.current])

  function handleKeyDown(event: TextInputKeyPressEventData) {
    if (event.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <View
      style={tw`flex-1 items-center justify-center bg-light-c60 dark:bg-dark-c60 `}
    >
      <HeaderChat
        assistente={assistente}
        digitando={digitando}
        conversaId={mensagens.at(0)?.conversaId}
      />
      {!(refreshing && loading) ? (
        <ScrollView
          ref={messagesRef}
          style={tw`w-full flex-1`}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refreshChat} />
          }
        >
          <View style={[tw`w-full flex-1 flex-col-reverse  gap-2 p-4 pb-2`]}>
            {mensagemProvisoria && (
              <BalaoMensagem mensagem={mensagemProvisoria} />
            )}
            {mensagens &&
              mensagens
                .sort((a, b) => compareDate(b.dataHora, a.dataHora))
                .map((mensagem) => (
                  <BalaoMensagem key={mensagem.id} mensagem={mensagem} />
                ))}
          </View>
        </ScrollView>
      ) : (
        <View style={tw`w-full flex-1 items-center justify-center`}>
          <ActivityIndicator style={tw`self-center`} size={50} />
        </View>
      )}
      {conversa && (
        <ChatInput
          conversa={conversa}
          disable={recebendo || digitando}
          userInput={userInput}
          setUserInput={setUserInput}
          sendMessage={sendMessage}
          handleKeyDown={handleKeyDown}
        />
      )}
    </View>
  )
}
