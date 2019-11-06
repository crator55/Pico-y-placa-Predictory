<?php

Placa();
echo json_encode(Placa());
function Placa()
{

   // Validar las entradas
   $placa = filter_var($_POST['Placa'], FILTER_SANITIZE_STRING);
   $fecha = filter_var($_POST['Fecha'], FILTER_SANITIZE_STRING);
   $hora = filter_var($_POST['Hora'], FILTER_SANITIZE_STRING);


   $last_number = substr($placa, -1);
   $get_day = getdate(strtotime($fecha))['weekday'];
   $parse_hour = strtotime($hora);

   return getPicoDay($last_number, $get_day, $parse_hour);
}
function getPicoDay($last_number, $get_day, $parse_hour)
{

   if ($last_number === '1' || $last_number === '2') {
      if ($get_day === 'Monday') {
         return getPicoHour($parse_hour);
      } else {
         $respuesta = array('respuesta' => 'correcto');
      }
   }
   if ($last_number === '3' || $last_number === '4') {
      if ($get_day === 'Tuesday') {
         return getPicoHour($parse_hour);
      } else {
         $respuesta = array('respuesta' => 'correcto');
      }
   }
   if ($last_number === '5' || $last_number === '6') {
      if ($get_day === 'Wednesday') {
         return getPicoHour($parse_hour);
      } else {
         $respuesta = array('respuesta' => 'correcto');
      }
   }
   if ($last_number === '7' || $last_number === '8') {
      if ($get_day === 'Thrusday') {
         return getPicoHour($parse_hour);
      } else {
         $respuesta = array('respuesta' => 'correcto');
      }
   }
   if ($last_number === '9' || $last_number === '0') {
      if ($get_day === 'Friday') {
         return getPicoHour($parse_hour);
      } else {
         $respuesta = array('respuesta' => 'correcto');
      }
   }
   else{
      $respuesta = array('respuesta' => 'incorrecto');
   }

   return ($respuesta);
}
function getPicoHour($parse_hour)
{

   if ($parse_hour >= strtotime('07:00:00') && $parse_hour <= strtotime('09:30:00')) {
      $respuesta = array(
         'respuesta' => 'incorrecto'
      );
      return ($respuesta);
   } else {
      $respuesta = array('respuesta' => 'correcto');
   }
   if ($parse_hour >= strtotime('16:00:00') && $parse_hour <= strtotime('19:30:00')) {
      $respuesta = array(
         'respuesta' => 'incorrecto'
      );
      return ($respuesta);
   } else {
      $respuesta = array('respuesta' => 'correcto');
   }
   return ($respuesta);
}
